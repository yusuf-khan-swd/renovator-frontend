"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const Blog = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return isLoading ? <CenterLoading /> : <Accordion data={data} />;
};

export default Blog;
