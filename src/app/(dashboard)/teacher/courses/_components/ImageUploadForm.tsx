'use client';

import * as z from 'zod';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { Course } from '@prisma/client';
import Image from 'next/image';
import FileUpload from '@/components/FileUpload';

interface ImageUploadFormProps {
	initialData: Course;
	courseId: string;
}

const formSchema = z.object({
	imageUrl: z.string().min(1, {
		message: 'Image is required',
	}),
});

const ImageUploadForm = ({ initialData, courseId }: ImageUploadFormProps) => {
	const router = useRouter();
	const [isEditing, setIsEditing] = useState(false);

	const toggleEditTitle = () => setIsEditing((current) => !current);
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			await axios.patch(`/api/courses/${courseId}`, values);
			toast.success('Course Image Updated!');
			toggleEditTitle();
			router.refresh();
		} catch {
			toast.error('Something went wrong!');
		}
	};

	return (
		<div className="mt-6 border bg-slate-100 rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Course image
				<Button onClick={toggleEditTitle} variant="ghost">
					{isEditing && <>Cancel</>}
					{!isEditing && !initialData?.imageUrl && (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add an image
						</>
					)}
					{!isEditing && initialData?.imageUrl && (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit image
						</>
					)}
				</Button>
			</div>
			{!isEditing &&
				(!initialData?.imageUrl ? (
					<div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
						<ImageIcon className="w-10 h-10 text-slate-500" />
					</div>
				) : (
					<div className="relative aspect-video">
						<Image
							alt="Upload"
							fill
							className="object-cover rounded-md"
							src={initialData?.imageUrl}
						/>
					</div>
				))}
			{isEditing && (
				<div>
					<FileUpload
						endpoint="courseImage"
						onChange={(url) => {
							if (url) {
								onSubmit({ imageUrl: url });
							}
						}}
					/>

					<div className="text-sm text-muted-foreground mt-4">
						16:9 aspect ration recommended
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageUploadForm;
