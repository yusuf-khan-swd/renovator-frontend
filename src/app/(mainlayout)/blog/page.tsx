"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return isLoading ? <FullScreenLoading /> : <Accordion data={data} />;
};

export default BlogPage;
