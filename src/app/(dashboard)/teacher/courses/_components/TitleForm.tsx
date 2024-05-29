'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormMessage,
	FormItem,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface TitleFormProps {
	initialData: {
		title: string;
	};
	courseId: string;
}

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Title is required',
	}),
});

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEditTitle = () => setIsEditing((current) => !current);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData,
	});

	const { isSubmitting, isValid } = form.formState;
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);
			toast.success('Course Updated!');
			toggleEditTitle();
			router.refresh();
		} catch {
			toast.error('Something went wrong!');
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course Title
				<Button onClick={toggleEditTitle} variant="ghost">
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit Title
						</>
					)}
				</Button>
			</div>
			{!isEditing && <p className="text-sm mt-2">{initialData?.title}</p>}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											disabled={isSubmitting}
											{...field}
											placeholder="e.g. 'Advanced web development'"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-x-2">
							<Button
								disabled={isSubmitting || !isValid}
								type="submit"
							>
								Save
							</Button>
						</div>
					</form>
				</Form>
			)}
		</div>
	);
};

export default TitleForm;
