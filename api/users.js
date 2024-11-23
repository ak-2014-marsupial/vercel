import {handlerCORS} from "../src_backend/handlers/cors.handler";
import connectDB from "../src_backend/configs/connectionDB";
import {ApiError} from "../src_backend/errors/api.error";
import {userRepository} from "../src_backend/repositories/user.repository";

export default async function handler(req, res) {
    // CORS
    handlerCORS(req,res);
    connectDB().then();
    const fullUrl = req.url;
    const path = new URL(fullUrl, `https://${req.headers.host}`).pathname;

    if (req.method === 'GET') {
        try{
            console.log("users.js >>> fetching AllUsers");
            const result = await userRepository.getAll();
            res.json(result);
        }catch (e) {
            throw new ApiError("Something went wrong",401)
        }


        // const users = [
        //     {id: 1, name: 'Andrew_1'},
        //     {id: 2, name: 'Andrew_2'}
        // ];
        // res.status(200).json(users);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} not allowed`);
    }
}