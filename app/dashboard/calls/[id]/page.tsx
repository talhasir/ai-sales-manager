import { getCallById } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { CallDetailClient } from "./call-detail-client";

export default async function CallDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const call = await getCallById(id);

  if (!call) {
    notFound();
  }

  return <CallDetailClient call={call} />;
}
