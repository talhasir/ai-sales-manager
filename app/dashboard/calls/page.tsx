import { getCalls, SalesCall } from "@/lib/mock-data";
import { CallLibraryClient } from "./call-library-client";

export default async function CallLibraryPage() {
  const allCalls = await getCalls();
  
  return <CallLibraryClient calls={allCalls} />;
}

