import type { PaperProps } from "@mui/material";
import Paper from "@mui/material/Paper";

interface StyledPaperProps extends PaperProps {
    className: string;
}

export default function StyledPaper({ className, ...props }: StyledPaperProps) {
    return (
        <Paper
            {...props}
            className={`styled-paper ${className}`}
            sx={{
                borderRadius: "42px",
                ...props.sx,
            }}>
            {props.children}
        </Paper>
    );
}
