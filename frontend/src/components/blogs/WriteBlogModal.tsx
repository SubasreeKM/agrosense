import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { addBlog } from "@/services/blogService";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["Organic", "Technology", "Irrigation", "Pest Control", "Market"];

export default function WriteBlogModal({ open, onClose, onSuccess }: any) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Organic",
    image: "",
    read_time: "5 min read",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Login required", variant: "destructive" });
      return;
    }

    if (!form.title || !form.excerpt || !form.content || !form.image) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const avatar = user.email.substring(0, 2).toUpperCase();

      await addBlog({
        ...form,
        author: user.email,
        avatar,
      });

      toast({ title: "Article published successfully!" });

      onSuccess();   // refresh blogs
      onClose();     // close modal
    } catch (err: any) {
      console.error("Publish failed:", err);
      toast({
        title: "Failed to publish article",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write New Article</DialogTitle>
        </DialogHeader>

        <Input placeholder="Blog Title" onChange={(e) => handleChange("title", e.target.value)} />
        <Input placeholder="Short Description" onChange={(e) => handleChange("excerpt", e.target.value)} />
        <Textarea rows={6} placeholder="Full Article Content" onChange={(e) => handleChange("content", e.target.value)} />
        <Input placeholder="Cover Image URL" onChange={(e) => handleChange("image", e.target.value)} />

        <select
          className="w-full border rounded px-3 py-2"
          onChange={(e) => handleChange("category", e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <Input
          placeholder="Read Time (eg: 6 min read)"
          value={form.read_time}
          onChange={(e) => handleChange("read_time", e.target.value)}
        />

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Publishing..." : "Publish Article"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
