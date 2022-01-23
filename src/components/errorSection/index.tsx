import React from "react";

interface Props {
  reason?: string;
}

function ErrorSection({ reason }: Props) {
  return (
    <section
      style={{
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 32,
        color: "#FF6464",
        padding: 32,
        textAlign: "center",
      }}
    >
      <span>{reason || "Oops, somethings went wrong."}</span>
    </section>
  );
}

export default ErrorSection;
