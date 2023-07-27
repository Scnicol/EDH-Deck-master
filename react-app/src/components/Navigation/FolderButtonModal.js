import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function FolderButton({ user }) {

    return (
        <div>
            <NavLink to={`/decks/current`}>
                Decks
            </NavLink>
            <NavLink to={`/challenges/current`}>
                Challenges
            </NavLink>
            <NavLink to={`/wishlist`}>
                Wishlist
            </NavLink>
            <NavLink to={`/reviews/current`}>
                Reviews
            </NavLink>
        </div>
    )
}

export default FolderButton;
