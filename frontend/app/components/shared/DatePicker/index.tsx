import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker as MuiPicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parse, parseISO } from "date-fns";
import { useRef } from "react";

type DatePickerProps = {
    name: string;
    expiration?: string;
};

function DatePicker({ name, expiration }: DatePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: Date | null) => {
        if (inputRef.current) {
            inputRef.current.value =
                e?.toISOString() ??
                parse(new Date().toString(), "dd/MMMM/yyyy", new Date()).toISOString();
            console.log(inputRef.current.value);
        }
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
                minDate={new Date()}
                label="day/month/year"
                format="dd/MMMM/yyyy"
                sx={{
                    inlineSize: "200px",
                }}
                onChange={handleChange}
                defaultValue={expiration ? parseISO(expiration) : new Date()}
            />
        </>
    );
}

export default function Wrapper({ name, expiration }: { name: string; expiration?: string }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker name={name} expiration={expiration} />
        </LocalizationProvider>
    );
}
