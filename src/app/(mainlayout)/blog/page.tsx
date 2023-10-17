"use client";

import { useBlogsQuery } from "@/redux/api/content/blogApi";
import { Card } from "antd";

const BlogPage = () => {
  const { data, isLoading } = useBlogsQuery(undefined);

  return (
    <div>
      <h1>Blog Page</h1>
      {data?.map((blog: any) => (
        <div key={blog?.id}>
          <Card hoverable title={blog?.title} style={{ width: 240 }}>
            <p>{blog?.description}</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
