import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import SectionHeader from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, MapPin, Globe, Linkedin, Github, Twitter } from "lucide-react";
import { sendContactEmail } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * ContactSection component providing a user interface for sending messages.
 * Uses react-hook-form for validation and handles API interaction for email sending.
 */
export default function ContactSection() {
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with Zod validation schema
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  /**
   * Handles form submission.
   * Sends the validated data to the backend API endpoint.
   * 
   * @param data - The validated form values (name, email, subject, message).
   */
  const onSubmit = async (data: FormValues) => {
    setIsSending(true);
    try {
      const result = await sendContactEmail(
        data.name,
        data.email,
        data.subject,
        data.message
      );
      
      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
        form.reset();
      } else {
        // Handle the error from the API
        toast({
          variant: "destructive",
          title: "Failed to send message",
          description: result.message || "Please try again later or contact me directly via email.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <section id="contact" className="section py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Get In Touch" 
          description="I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                  <a 
                    href="mailto:james@anunda.dev" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                  >
                    james@anunda.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-gray-600 dark:text-gray-400">Dallas, Texas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  <Globe className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h4>
                  <div className="flex space-x-4 mt-2">
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                      aria-label="Twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="your@email.com" 
                            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject of your message" 
                          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Your message..." 
                          className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-[120px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
