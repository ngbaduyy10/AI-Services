'use client'
import HeaderBox from "@/components/HeaderBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormField, FormControl, FormItem} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Card} from "@/components/ui/card";
import {Select, SelectContent, SelectTrigger, SelectValue, SelectItem} from "@/components/ui/select";
import {amountOptions, resolutionOptions} from "@/constants";

const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
    amount: z.string().min(1),
    resolution: z.string().min(1),
})

const Conversation = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            setImages([]);
            const response = await axios.post("/api/image", values);
            if (response.data.images) {
                const urls = response.data.map((image: { url: string }) => image.url);
                setImages(urls);
                form.reset();
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <HeaderBox
                title={"Image"}
                subtext={"Turn your prompt into an image"}
                dashboard={false}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-1 border p-2 rounded-xl">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-6">
                                <FormControl>
                                    <Input
                                        placeholder="How can I help you?"
                                        disabled={loading}
                                        className="border-0 focus-visible:ring-0 focus-visible:ring-transparent"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {amountOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="resolution"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-2">
                                <FormControl>
                                    <Select
                                        disabled={loading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {resolutionOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={loading} className="image-button">
                        Generate
                    </Button>
                </form>
            </Form>

            {loading ? (
                <div className="flex-center">
                    <LoaderCircle size={40} className="animate-spin"/>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {images?.map((image) => (
                        <Card key={image} className="rounded-lg">
                            <Image src={image} alt="image" fill onClick={() => window.open(image)} />
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Conversation;