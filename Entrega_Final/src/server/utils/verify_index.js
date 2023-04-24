import ErrRead from "../models/errors/error_could_not_read.js";

export const verifyIndex = index => (index === -1) && new ErrRead();