class AuthHandler {
    async signIn(req, res) {
        const {username, password} = req.body;
        if (username === 'user' && password === 'pass') {
            return res.status(200).json({message: 'Authenticated'});
        }
        return res.status(401).json({message: 'Unauthorized'});
    }

    async signUp(req, res) {
        const {username, password} = req.body;
        console.log("AuthHandler: ",req.body);
        return res.status(201).json({message: 'User created'});
    }

    async getMe(req, res) {
        const userData = {id: '1', name: 'John Doe'}; // Placeholder logic
        return res.status(200).json(userData);
    }

    async deleteMe(req, res) {
        return res.status(204).json({message: 'User deleted'});
    }

    async updateMe(req, res) {
        const {name} = req.body;
        return res.status(200).json({message: 'User updated', name});
    }
}

export const handlerAuth = new AuthHandler();