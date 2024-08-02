"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import Accordion from "@/components/ui/Accordion";
import { useBlogsQuery } from "@/redux/api/content/blogApi";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return isLoading ? (
    <CenterLoading />
  ) : data && data.length > 0 ? (
    <Accordion data={data} />
  ) : (
    <h3 style={{ margin: "2px", textAlign: "center" }}>No Blogs available</h3>
  );
};

export default BlogPage;
