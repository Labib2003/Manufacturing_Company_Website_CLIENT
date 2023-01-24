import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export default function BlogCard({ blog }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" color="text.primary" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">{blog.body}</Typography>
      </CardContent>
    </Card>
  );
}
