//backend/controller/product.js
export const getProducts = (req, res) => {
  const sql = "SELECT * FROM product";
  req.db.query(sql, (error, data) => {
    if (error) {
      console.error("Query Error: ", error);
      return res.status(500).json({ message: "Error fetching data" });
    }
    return res.json(data);
  });
};

export const addProducts = (req, res) => {
  const sql = "INSERT INTO product (`name`,`description`,`price`,`quantity`,`production`,`expiry`) VALUES(?)";
  const values = [
    req.body.name, req.body.description,
    req.body.price, req.body.quantity,
    req.body.production, req.body.expiry
  ];
  req.db.query(sql, [values], (error, data) => {
    if (error) {
      console.error("Insert Error: ", error);
      return res.status(500).json({ message: "Error inserting data" });
    }
    return res.status(201).json({ message: "Product added successfully", data });
  });
};


export const deleteProducts = (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM product WHERE ID = ?";
  req.db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Delete Error: ", err);
      return res.status(500).json({ message: "Error deleting data" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Delete successful" });
  });
};

export const patchProducts = (req, res) => {
  const id = req.params.id;
  const { name, description, price, quantity, production, expiry } = req.body;

  // Construct the SQL query dynamically based on provided fields
  let sql = "UPDATE product SET ";
  let values = [];
  const updates = [];

  if (name) {
    updates.push("name = ?");
    values.push(name);
  }
  if (description) {
    updates.push("description = ?");
    values.push(description);
  }
  if (price) {
    updates.push("price = ?");
    values.push(price);
  }
  if (quantity) {
    updates.push("quantity = ?");
    values.push(quantity);
  }
  if (production) {
    updates.push("production = ?");
    values.push(production);
  }
  if (expiry) {
    updates.push("expiry = ?");
    values.push(expiry);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  sql += updates.join(", ") + " WHERE id = ?";
  values.push(id);

  req.db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Update Error: ", err);
      return res.status(500).json({ message: "Error updating data" });
    }
    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({ message: "Update successful" });
  });
};
