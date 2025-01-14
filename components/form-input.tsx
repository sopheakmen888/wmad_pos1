import React, { ReactNode, FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    label: string;
    type: string;
    id: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

const FormPage: FC<Props> = ({ label, type, id, onChange, placeholder }) => {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="code">{label}</Label>
            <Input type={type} id={id} onChange={onChange} placeholder={placeholder} required className="border border-slate-500 h-[50px]" />
        </div>
    );
};

export default FormPage;