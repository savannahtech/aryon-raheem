import React from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Button} from "../ui/button";
import {Link} from "react-router";

class ErrorBoundary extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: any) {
    return {hasError: true};
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (<div className="p-4 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>An error occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p>An unexpected error has occurred, kindly refresh the screen or click the button
              below</p>
          </CardContent>
          <CardFooter>
            <Button size="lg" asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
