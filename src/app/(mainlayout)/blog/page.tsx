"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return isLoading ? <CenterLoading /> : <Accordion data={data} />;
};

export default BlogPage;
