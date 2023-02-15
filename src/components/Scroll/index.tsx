import React from "react";
import {
    PersonWithBirthDateGroup,
    PersonWithBirthDate,
    ScrollableListItemTypes,
    Person
} from "../../store/types";

interface Props {
    RenderItem: React.FC<any>;
    onClickFunction?: (arg?: any) => void;
    listFavs?: PersonWithBirthDateGroup[] | PersonWithBirthDate[];
    listPersons?: Person[];
    currDate?: string;
    updateFavorites?: (list: PersonWithBirthDate[]) => void;
    itemType: ScrollableListItemTypes.FAVS | ScrollableListItemTypes.REGS;
    height: string; // Percentage, i.e. "50%"
}

const ScrollableList: React.FC<Props> = ({
    RenderItem,
    onClickFunction,
    listFavs,
    listPersons,
    currDate,
    updateFavorites,
    itemType,
    height
}: Props) => {
    const handleItemClick = (item: any) => {
        onClickFunction && onClickFunction(item);
    };

    // TODO: take the scrollable div out of here to create a stand-alone component taking children nodes as props, probably in this same file.
    if (itemType === ScrollableListItemTypes.FAVS) {
        return (
            <div style={{ overflowY: "auto", maxHeight: height }}>
                {listFavs && listFavs.map((item, i) => (
                    <div key={i.toString()}>
                        {<RenderItem group={item} />}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div style={{ overflowY: "auto", maxHeight: height }}>
            {listPersons && listPersons.map((item, i) => (
                <div key={i.toString()} onClick={() => handleItemClick(item)}>
                    {<RenderItem
                        item={item}
                        list={listFavs}
                        currDate={currDate}
                        updateFavorites={updateFavorites}
                    />}
                </div>
            ))}
        </div>
    );
}

export default ScrollableList;
