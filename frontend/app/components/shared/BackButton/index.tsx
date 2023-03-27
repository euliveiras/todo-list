import CloseIcon from "@mui/icons-material/Close";
import { Link } from "@remix-run/react";

type BackButtonProps = {
    classes?: string;
    to: string;
};

export default function BackButton({ classes, to }: BackButtonProps) {
    return (
        <Link to={to} className={`${classes} close-btn`} aria-label="back to home">
            <CloseIcon />
        </Link>
    );
}
