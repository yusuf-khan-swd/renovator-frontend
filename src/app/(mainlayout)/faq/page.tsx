"use client";

import FullScreenLoading from "@/components/Loading/FullScreenLoading";
import Accordion from "@/components/ui/Accordion";
import { useFaqsQuery } from "@/redux/api/content/faqApi";

const FaqPage = () => {
  const { data, isLoading } = useFaqsQuery(undefined);

  return isLoading ? <FullScreenLoading /> : <Accordion data={data} />;
};

export default FaqPage;
