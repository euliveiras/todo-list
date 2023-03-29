import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker as MuiPicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parse, parseISO } from "date-fns";
import { useRef } from "react";
import type { SxProps } from "@mui/material";

interface DatePickerProps {
    name: string;
    expiration?: string;
    onChange?: (e: Date | null) => void;
    sx?: SxProps;
    label?: string;
    format?: string;
    minDate?: Date;
}

function DatePicker({ name, expiration, onChange, ...props }: DatePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: Date | null) => {
        if (inputRef.current) {
            inputRef.current.value =
                e?.toISOString() ??
                parse(new Date().toString(), "dd/MMMM/yyyy", new Date()).toISOString();
        }
        onChange && onChange(e);
    };

    return (
        <>
            <label hidden htmlFor="date-picker">
                Select task date expiration
            </label>

            <input
                id="date-picker"
                hidden
                type="text"
                defaultValue={expiration ?? new Date().toISOString()}
                name={name}
                ref={inputRef}
            />

            <MuiPicker
                minDate={props.minDate ?? new Date()}
                label={props.label ?? "day/month/year"}
                format={props.format ?? "dd/MMMM/yyyy"}
                sx={{
                    inlineSize: "200px",
                    ...props.sx,
                }}
                onChange={handleChange}
                defaultValue={expiration ? parseISO(expiration) : new Date()}
            />
        </>
    );
}

export default function Wrapper({ name, expiration, onChange, ...props }: DatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker name={name} expiration={expiration} onChange={onChange} {...props} />
        </LocalizationProvider>
    );
}
