import React from 'react';
import Container from "../../components/Container";
import {Link} from "react-router";
import {Button} from "../../components/ui/button";

interface IProps {
  title: string;
}

function DashboardPage({title}: IProps) {
  return (
    <Container>
      <h2 data-testid="title">{title}</h2>

      <div className="mt-6">
        <Button size="lg" asChild>
          <Link to="/recommendations" data-testid="link">
            See all recommendations
          </Link>
        </Button>
      </div>
    </Container>
  );
}

export default DashboardPage;
