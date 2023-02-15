import React from "react";
import { PersonWithBirthDateGroup } from "../../store/types";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

interface Props {
    group: PersonWithBirthDateGroup;
}

const ItemFavs: React.FC<Props> = ({ group }) => {
    const { day, month, text } = group;

    const monthName = monthNames[month - 1];

    return (
        <li>
            <div style={{ fontWeight: "bold", fontSize: 14 }}>
                {monthName} {day}
            </div>
            {text.map((item, i) => (
                <div key={i} style={{ fontSize: 14 }}>
                    {item}
                </div>
            ))}
        </li>
    );
};

export default ItemFavs;
