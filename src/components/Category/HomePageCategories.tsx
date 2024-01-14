"use client";

import CenterLoading from "@/components/Loading/CenterLoading";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { Button, Col, Row } from "antd";
import Link from "next/link";

const HomePageCategories = () => {
  const { data: categories, isLoading: categoryIsLoading } =
    useCategoriesQuery(undefined);
  return (
    <div style={{ margin: "20px 0" }}>
      {categoryIsLoading ? (
        <CenterLoading />
      ) : (
        <Row gutter={{ lg: 24 }}>
          {categories?.map((category: any) => (
            <Col xs={24} lg={8} key={category?.id}>
              <Link href={`/category/${category?.id}`}>
                <Button style={{ margin: "4px", width: "100%" }}>
                  {category?.title}
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePageCategories;
