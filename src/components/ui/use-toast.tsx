import { useState } from "react";

export function toast({ title, description, variant }:{ title:string, description:string, variant:string }) {
  const [visible, setVisible] = useState(true);

  return (
    visible && (
      <div className={`toast ${variant}`}>
        <strong>{title}</strong>
        <p>{description}</p>
        <button onClick={() => setVisible(false)}>Close</button>
      </div>
    )
  );
}
