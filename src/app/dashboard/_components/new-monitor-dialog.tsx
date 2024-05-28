"use client";

import { useCallback, useState } from "react";
import { HttpMethodType } from "@prisma/client";

import { Spinner } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~/components/ui/select";
import { Slider } from "~/components/ui/slider";
import { ToastAction } from "~/components/ui/toast";
import { useToast } from "~/components/ui/use-toast";
import { useZodForm } from "~/hooks";
import {
  CreateMonitorSchema,
  type CreateMonitorValues
} from "~/server/validators";
import { trpc } from "~/trpc/react";

const formatInterval = (interval: number) => {
  if (interval < 60) return `${interval} seconds`;
  return `${Number(interval / 60).toFixed(0)} minutes`;
};

const httpMethodTypeOptions = [
  HttpMethodType.HEAD,
  HttpMethodType.GET,
  HttpMethodType.POST,
  HttpMethodType.OPTIONS
] as const;

const intervalMap = {
  0: 10,
  1: 15,
  2: 20,
  3: 30,
  4: 60,
  5: 120,
  6: 180,
  7: 300,
  8: 600
} as const;

export const NewMonitorDialog = () => {
  const zodForm = useZodForm({
    schema: CreateMonitorSchema,
    defaultValues: {
      interval: 30,
      timeout: 10,
      httpMethodType: HttpMethodType.HEAD
    }
  });

  const utils = trpc.useUtils();

  const [mappedInterval, setMappedInterval] = useState(30);
  const [open, setOpen] = useState(false);

  const timeout = zodForm.watch("timeout");

  const createMonitorMutation = trpc.monitor.create.useMutation();

  const { toast } = useToast();

  const onSubmit = useCallback(
    async (values: CreateMonitorValues) => {
      try {
        await createMonitorMutation.mutateAsync(values);
        toast({
          description: "Your new monitor has been created"
        });
        await utils.monitor.list.invalidate();
        setOpen(false);
        zodForm.reset();
      } catch (e: unknown) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: (
            <ToastAction
              altText="Try again"
              onClick={() => onSubmit(zodForm.getValues())}
            >
              Try again
            </ToastAction>
          )
        });
      }
    },
    [createMonitorMutation, utils, zodForm, toast]
  );

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-sm">
          New Monitor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>New Monitor</DialogTitle>
        </DialogHeader>
        <Form {...zodForm}>
          <form onSubmit={zodForm.handleSubmit(onSubmit)}>
            <FormField
              control={zodForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center border-b-[1px] border-b-border py-5">
                  <FormLabel className="col-span-1 text-sm font-medium">
                    Name
                  </FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="pt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={zodForm.control}
              name="url"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center border-b-[1px] border-b-border py-5">
                  <FormLabel className="col-span-1 text-sm font-medium">
                    URL
                  </FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="pt-2" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={zodForm.control}
              name="interval"
              render={() => (
                <FormItem className="grid grid-cols-3 border-b-[1px] border-b-border py-5">
                  <FormLabel className="col-span-1 text-sm font-medium">
                    Check Interval
                  </FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Slider
                        max={7.5}
                        min={0}
                        step={0.01}
                        defaultValue={[2.5]}
                        onValueChange={(value) => {
                          const newValue = value[0];
                          const newValueRounded = Math.round(
                            newValue
                          ) as keyof typeof intervalMap;
                          const newMappedInterval =
                            intervalMap[newValueRounded];

                          setMappedInterval(newMappedInterval);
                          zodForm.setValue("interval", newMappedInterval);
                        }}
                      />
                    </FormControl>
                    <FormDescription className="pt-6">
                      Run check every <b>{formatInterval(mappedInterval)}</b>
                    </FormDescription>
                    <FormMessage className="pt-6" />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={zodForm.control}
              name="timeout"
              render={() => (
                <FormItem className="grid grid-cols-3 border-b-[1px] border-b-border py-5">
                  <FormLabel className="col-span-1 text-sm font-medium">
                    Check Timeout
                  </FormLabel>
                  <div className="col-span-2">
                    <FormControl>
                      <Slider
                        max={60}
                        min={1}
                        step={1}
                        defaultValue={[10]}
                        onValueChange={(value) =>
                          zodForm.setValue("timeout", value[0])
                        }
                      />
                    </FormControl>
                    <FormDescription className="pt-6">
                      Check request will timeout after <b>{timeout} seconds</b>
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={zodForm.control}
              name="httpMethodType"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center border-b-[1px] border-b-border py-5">
                  <FormLabel className="col-span-1 text-sm font-medium">
                    HTTP Method
                  </FormLabel>
                  <div className="sm:col-span-2">
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="httpMethodType" className="w-52">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {httpMethodTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage className="pt-2" />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4 flex flex-row justify-end gap-4">
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {zodForm.formState.isSubmitting && (
                  <Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
