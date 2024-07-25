"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const Blog = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return isLoading ? (
    <CenterLoading />
  ) : !data || data.length <= 0 ? (
    <h3 style={{ margin: "2px", textAlign: "center" }}>No Blogs available</h3>
  ) : (
    <Accordion data={data} />
  );
};

export default Blog;
