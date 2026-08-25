/**
 * contact-section.tsx — the "Get In Touch" section of the portfolio.
 *
 * Provides two columns:
 *  - Left: static contact information (email, location, social links)
 *  - Right: a validated contact form that POSTs to /api/contact on submission
 *
 * Form validation is handled by react-hook-form + Zod.
 * Email delivery is handled by the Express backend via SendGrid — no database is used.
 */

// useState manages the "is the form currently submitting?" loading flag
import { useState } from "react";

// z is the Zod schema builder used to define and validate the form shape
import { z } from "zod";

// useForm is the react-hook-form hook that manages field state, validation, and submission
import { useForm } from "react-hook-form";

// zodResolver bridges Zod schemas with react-hook-form's validation system
import { zodResolver } from "@hookform/resolvers/zod";

// useToast triggers toast notification pop-ups for success and error feedback
import { useToast } from "@/hooks/use-toast";

// Shared section title + subtitle component used across all major sections
import SectionHeader from "@/components/shared/section-header";

// shadcn/ui primitive components for buttons, inputs, textareas, and form wrappers
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Lucide icon components used in the contact info list on the left side
import { Mail, MapPin, Globe, Linkedin, Github } from "lucide-react";

// Utility that makes the POST request to the /api/contact Express endpoint
import { sendContactEmail } from "@/lib/utils";
import { content } from "@/data/content";

/**
 * formSchema — Zod validation schema for the contact form.
 *
 * Each field has a minimum character requirement with a clear error message.
 * react-hook-form will display these messages next to the failing fields.
 */
const formSchema = z.object({
  // Name must be at least 2 characters (rejects single-character inputs)
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  // Email must be a valid email format (e.g. "user@example.com")
  email: z.string().email({ message: "Please enter a valid email address." }),

  // Subject must be at least 5 characters (prevents single-word subjects)
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),

  // Message must be at least 10 characters (prevents empty or trivially short messages)
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// TypeScript type inferred from the Zod schema — used to type the form values object
type FormValues = z.infer<typeof formSchema>;

/**
 * ContactSection — renders the full "Get In Touch" section.
 */
export default function ContactSection() {

  // isSending tracks whether a form submission is in progress
  // Used to disable the submit button and show "Sending..." text while waiting
  const [isSending, setIsSending] = useState(false);

  // Destructure the toast trigger function from the custom hook
  const { toast } = useToast();

  // Initialise the react-hook-form instance with Zod validation and empty default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), // Wire Zod as the validation engine

    // Default values ensure all fields are controlled from the first render
    defaultValues: {
      name: "",     // Empty string so the input starts blank
      email: "",    // Empty string so the input starts blank
      subject: "",  // Empty string so the input starts blank
      message: "",  // Empty string so the textarea starts blank
    },
  });

  /**
   * onSubmit — called by react-hook-form after all Zod validations pass.
   *
   * Sets the loading flag, sends the data to the API, shows a toast for
   * success or failure, resets the form on success, and always clears the flag.
   *
   * @param data - The fully validated form values typed as FormValues.
   */
  const onSubmit = async (data: FormValues) => {
    // Show the loading state — disables the button and changes its label
    setIsSending(true);

    try {
      // Call the fetch wrapper which POSTs to /api/contact on the Express server
      const result = await sendContactEmail(
        data.name,    // Sender's full name
        data.email,   // Sender's email address
        data.subject, // Subject line
        data.message  // Message body
      );

      // Branch on whether the API call reported success or failure
      if (result.success) {
        // Email was accepted by SendGrid — show a success toast
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });

        // Reset all form fields back to their default empty values
        form.reset();

      } else {
        // The API returned { success: false } — show a descriptive error toast
        toast({
          variant: "destructive", // Red / error styling for the toast
          title: "Failed to send message",
          description: result.message || "Please try again later or contact me directly via email.",
        });
      }

    } catch (error) {
      // Catch any unexpected errors not handled inside sendContactEmail
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
      });

    } finally {
      // Always clear the loading flag whether the request succeeded or failed
      setIsSending(false);
    }
  };

  return (
    // Section element with id "contact" so the scroll-spy can highlight the nav link
    // White background in light mode, dark gray in dark mode
    <section id="contact" className="section py-20 bg-white dark:bg-gray-900 transition-colors">

      {/* Centred container with responsive horizontal padding */}
      <div className="container mx-auto px-4">

        {/* Shared section header: title and subtitle for the contact section */}
        <SectionHeader
          title="Get In Touch"
          description="I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!"
        />

        {/* Two-column grid: contact info left, form right — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT COLUMN — static contact information */}
          <div className="flex flex-col justify-center">

            {/* Sub-heading for the contact info block */}
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>

            {/* Vertically spaced list of contact info rows */}
            <div className="space-y-6">

              {/* Email row */}
              <div className="flex items-start space-x-4">
                {/* Icon circle background */}
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  {/* Mail icon from Lucide */}
                  <Mail className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  {/* Row label */}
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email</h4>
                  {/* Clickable mailto link — opens the user's default email client */}
                  <a
                    href="mailto:james@anunda.dev"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                  >
                    james@anunda.dev
                  </a>
                </div>
              </div>

              {/* Location row */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  {/* Map pin icon from Lucide */}
                  <MapPin className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h4>
                  {/* Static location text — not a link */}
                  <p className="text-gray-600 dark:text-gray-400">Dallas, Texas</p>
                </div>
              </div>

              {/* Social media row */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-50 dark:bg-gray-800 p-3 rounded-full">
                  {/* Globe icon represents "online presence" */}
                  <Globe className="h-5 w-5 text-primary dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h4>

                  {/* Row of social icon links */}
                  <div className="flex space-x-4 mt-2">

                    {/* LinkedIn profile link */}
                    <a
                      href={content.profile.linkedinUrl}
                      target="_blank"          // Opens in a new tab
                      rel="noopener noreferrer" // Security: prevents the new tab from accessing window.opener
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"    // Accessible label since there is no visible text
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>

                    {/* GitHub profile link */}
                    <a
                      href={content.profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="h-5 w-5" />
                    </a>

                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN — contact form */}
          <div>
            {/* Form context provider from shadcn/ui — passes the form instance to child fields */}
            <Form {...form}>

              {/* HTML form element — onSubmit is wired to react-hook-form's handleSubmit */}
              {/* handleSubmit runs Zod validation first; only calls onSubmit if all fields pass */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg">

                {/* Two-column sub-grid for the Name and Email fields side by side on md+ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                  {/* Full Name field */}
                  <FormField
                    control={form.control} // Connects this field to the form instance
                    name="name"            // Must match the key in formSchema
                    render={({ field }) => (
                      <FormItem>
                        {/* Visible label for the input */}
                        <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</FormLabel>
                        <FormControl>
                          {/* Text input — {...field} spreads value, onChange, onBlur, etc. */}
                          <Input
                            placeholder="Your name"
                            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                            {...field}
                          />
                        </FormControl>
                        {/* Renders the Zod error message below the field when validation fails */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email Address field */}
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

                {/* Subject field — full width, below the two-column row */}
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

                {/* Message field — uses Textarea so users can write multi-line messages */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</FormLabel>
                      <FormControl>
                        {/* min-h-[120px] gives enough vertical space for a short message */}
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

                {/* Submit button — full width, disabled while the form is submitting */}
                <Button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  disabled={isSending} // Prevent duplicate submissions while the request is in flight
                >
                  {/* Label changes to "Sending..." to give visual feedback during the request */}
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
