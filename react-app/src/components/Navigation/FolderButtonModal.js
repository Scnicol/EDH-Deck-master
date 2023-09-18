import React from "react";
import { NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './FolderButton.css'

function FolderButton() {
    const { closeModal } = useModal();
    return (
        <div className="inventory-container">
            <div className="inventory-title">
                Inventory
            </div>

            <NavLink className="button" to={`/decks/current`} onClick={closeModal}>
                Decks
            </NavLink>
            <NavLink className="button" to={`/challenges/current`} onClick={closeModal}>
                Challenges
            </NavLink>
            <NavLink className="button" to={`/wishlist`} onClick={closeModal}>
                Wishlist
            </NavLink>
            <NavLink className="button" to={`/reviews/current`} onClick={closeModal}>
                Reviews
            </NavLink>
        </div>
    )
}

export default FolderButton;
