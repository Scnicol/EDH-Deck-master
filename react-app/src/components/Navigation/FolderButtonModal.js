import React from "react";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";

function FolderButton() {
    const {closeModal} = useModal();
    return (
        <div>
            <NavLink to={`/decks/current`} onClick={closeModal}>
                Decks
            </NavLink>
            <NavLink to={`/challenges/current`} onClick={closeModal}>
                Challenges
            </NavLink>
            <NavLink to={`/wishlist`} onClick={closeModal}>
                Wishlist
            </NavLink>
            <NavLink to={`/reviews/current`} onClick={closeModal}>
                Reviews
            </NavLink>
        </div>
    )
}

export default FolderButton;
