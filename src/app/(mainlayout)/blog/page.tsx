"use client";

import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return <Accordion data={data} />;
};

export default BlogPage;
