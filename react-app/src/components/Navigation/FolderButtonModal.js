import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

function FolderButton({ user }) {

    return (
        <div>
            <NavLink exact to={`/decks/current`}>
                Decks
            </NavLink>
            <NavLink exact to={`/challenges/current`}>
                Challenges
            </NavLink>
            <NavLink exact to={`/wishlist`}>
                Wishlist
            </NavLink>
        </div>
    )
}

export default FolderButton;
