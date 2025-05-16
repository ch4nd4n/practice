"use client"; // Add this directive to make it a Client Component

import { Button } from "@/components/ui/button"; // Import the custom Button component
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Import Card components

export default function Home() {
  const handleButtonClick = () => {
    alert("hello");
  };

  return (
    <main className="flex items-center justify-center h-screen">
      {/* Set a fixed width for the card */}
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a description for the card.</CardDescription>
        </CardHeader>
        {/* Center the button within CardContent. CardContent's default px-6 still applies. */}
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
