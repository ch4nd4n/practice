"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const handleButtonClick = () => {
    alert("hello");
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description for the card.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={handleButtonClick}>hello world</Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
