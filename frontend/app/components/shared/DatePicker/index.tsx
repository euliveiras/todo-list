import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker as MuiPicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parse } from "date-fns";
import { useRef } from "react";

type DatePickerProps = {
    name: string;
};

function DatePicker({ name }: DatePickerProps) {
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

            <input id="date-picker" hidden type="text" name={name} ref={inputRef} />

            <MuiPicker
                minDate={new Date()}
                label="day/month/year"
                format="dd/MMMM/yyyy"
                sx={{
                    inlineSize: "200px",
                }}
                onChange={handleChange}
            />
        </>
    );
}

export default function Wrapper({ name }: { name: string }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker name={name} />
        </LocalizationProvider>
    );
}
