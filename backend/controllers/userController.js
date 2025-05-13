const userService = require("./../services/userService");

exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getUser(id);
    res.json({ user });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  const { userName, userEmail } = req.body;

  if (!userName || !userEmail) {
    return res.status(400).json({
      success: false,
      error: "Du har inte fyllt i fälten korrekt.",
    });
  }

  try {
    await userService.createUser(userName, userEmail, userPassword);
    return res.status(201).json({
      success: true,
      error: "",
      message: "Du har lagt till en ny användare.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;

    // Kontrollera att namn och email finns
    if (!userData.userName || !userData.userEmail) {
      return res.status(400).json({ message: "Alla värden måste anges" });
    }

    const updateUser = await userService.updateUser(userId, userData);
    res.json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await userService.deleteUser(userId);
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
