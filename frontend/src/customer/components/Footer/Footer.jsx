import React from "react";
import Grid2 from "@mui/material/Grid";
import { Button, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <div>
      <Grid2
        className="bg-black text-white text-center mt-10"
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid2 item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Company
          </Typography>

          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              About
            </Button>
          </div>

          <div>
            <Button className="pb-5" variant="h6">
              Blog
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              Press
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              Jobs
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              Partners
            </Button>
          </div>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Solutions
          </Typography>

          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              MARKETING
            </Button>
          </div>

          <div>
            <Button className="pb-5" variant="h6">
              ANALYTICS
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              COMMERCE
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              INSIGHTS
            </Button>
          </div>
          <div>
            <Button className="pb-5" variant="h6">
              SUPPORTS
            </Button>
          </div>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Documentation
          </Typography>

          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              GUIDES
            </Button>
          </div>

          <div>
            <Button className="pb-5" variant="h6">
              API STATUS
            </Button>
          </div>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <Typography className="pb-5" variant="h6">
            Legal
          </Typography>

          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              CLAIM
            </Button>
          </div>

          <div>
            <Button className="pb-5" variant="h6">
              PRIVACY
            </Button>
          </div>
          <div>
            {" "}
            <Button className="pb-5" variant="h6">
              TERMS
            </Button>
          </div>
        </Grid2>
        <Grid2 className="pt-20" item xs={12}>
          <Typography variant="body2" component="p" align="center">
            &copy; 2025 My Company. All Rights Reserved.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Made with love by Me.
          </Typography>
          <Typography variant="body2" component="p" align="center">
            Icons made by{" "}
            <Link
              href="https://www.freepik.com"
              color="inherit"
              underline="always"
            >
              Freepik
            </Link>{" "}
            from{" "}
            <Link
              href="https://www.flaticon.com/"
              color="inherit"
              underline="always"
            >
              www.flaticon.com
            </Link>
          </Typography>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Footer;
