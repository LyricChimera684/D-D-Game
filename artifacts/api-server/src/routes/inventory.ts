import { Router, type IRouter } from "express";
import { db, inventoryItemsTable, charactersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetInventoryParams,
  AddInventoryItemParams,
  AddInventoryItemBody,
  RemoveInventoryItemParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/characters/:characterId/inventory", async (req, res) => {
  const { characterId } = GetInventoryParams.parse({ characterId: req.params.characterId });
  const items = await db
    .select()
    .from(inventoryItemsTable)
    .where(eq(inventoryItemsTable.characterId, characterId))
    .orderBy(inventoryItemsTable.createdAt);
  res.json(items);
});

router.post("/characters/:characterId/inventory", async (req, res) => {
  const { characterId } = AddInventoryItemParams.parse({ characterId: req.params.characterId });
  const body = AddInventoryItemBody.parse(req.body);

  const [char] = await db.select().from(charactersTable).where(eq(charactersTable.id, characterId)).limit(1);
  if (!char) {
    res.status(404).json({ error: "Character not found" });
    return;
  }

  const [item] = await db
    .insert(inventoryItemsTable)
    .values({
      characterId,
      name: body.name,
      description: body.description ?? null,
      type: body.type,
      quantity: body.quantity,
    })
    .returning();

  res.status(201).json(item);
});

router.delete("/characters/:characterId/inventory/:itemId", async (req, res) => {
  const { characterId, itemId } = RemoveInventoryItemParams.parse({
    characterId: req.params.characterId,
    itemId: req.params.itemId,
  });

  await db
    .delete(inventoryItemsTable)
    .where(eq(inventoryItemsTable.id, itemId));

  res.json({ success: true, message: "Item removed" });
});

export default router;
