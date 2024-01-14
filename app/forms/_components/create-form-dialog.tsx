'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/trpc';
import { createFormSchema } from '@/schemas/create-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const CreateFormDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const createForm = api.form.create.useMutation();

  const context = api.useContext();

  const onCreateForm = (data: z.infer<typeof createFormSchema>) => {
    createForm.mutate(data, {
      onSuccess: () => {
        context.form.getAll.invalidate();
        toast.success('Form created successfully');
        setIsModalOpen(false);
      },
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" strokeWidth={3} />
          Create form
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg w-full mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-left">
            Create a new form
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCreateForm)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Form name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My new form"
                      {...field}
                      className="border-gray-300 font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createForm.isLoading}>
                {createForm.isLoading && (
                  <Icons.spinner className="w-4 h-4 animate-spin mr-2" />
                )}
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormDialog;
