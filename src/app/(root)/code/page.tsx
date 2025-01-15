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
import ReactMarkdown from "react-markdown";

const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required"),
})

interface Message {
    role: string;
    content: string;
}

const Conversation = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            setMessages((prev) => [...prev, { role: "user", content: values.prompt }]);
            const response = await axios.post("/api/code", { messages: values.prompt });
            if (response.data.message) {
                setMessages((prev) => [...prev, { role: "model", content: response.data.message }]);
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
                title={"Code"}
                subtext={"Most advanced conversation model"}
                dashboard={false}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-12 gap-1 border p-2 rounded-xl">
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-10 xl:col-span-11">
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

                    <Button type="submit" disabled={loading} className="conversation-button">
                        Generate
                    </Button>
                </form>
            </Form>

            {loading && (
                <div className="flex-center">
                    <LoaderCircle size={40} className="animate-spin"/>
                </div>
            )}
            <div className="flex flex-col-reverse gap-2">
                {messages?.map((message, index) => (
                    <div key={index} className={`flex ${message.role ==="user" ? 'justify-end' : 'justify-start'}`}>
                        <div className={`border rounded-2xl p-3 w-fit ${message.role === "model" && "bg-bank-sub-gradient"}`}>
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Conversation;