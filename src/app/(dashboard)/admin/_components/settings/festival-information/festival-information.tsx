import type { Component } from "#/utils/react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "#/react/ui";

export const FestivalInformation: Component = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Festival information</CardTitle>

        <CardDescription>Update your festival details</CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col items-start gap-6 w-full">
          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="festival-name" className="font-semibold">Festival name</Label>

            <Input id="festival-name" defaultValue="Les CuicuiteDays" />
            {/* <Spinner /> */}
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <Label htmlFor="festival-date" className="font-semibold">Festival date</Label>

            <Input id="festival-date" type="date" />
            {/* <Spinner /> */}
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-end">
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  );
};
