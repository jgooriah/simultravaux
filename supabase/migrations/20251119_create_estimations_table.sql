-- Migration: create_estimations_table
-- Date: 2025-11-19
-- Description: Table pour stocker toutes les estimations (chat IA, analyse photo, simulateur manuel)

-- Table principale
CREATE TABLE IF NOT EXISTS estimations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Type de méthode utilisée
  method_type TEXT NOT NULL CHECK (method_type IN ('chat_ia', 'analyse_photo', 'simulateur_manuel')),
  
  -- Contenu de l'estimation
  work_type TEXT NOT NULL,
  room_type TEXT,
  surface NUMERIC,
  quality TEXT,
  postal_code TEXT,
  
  -- Budget estimé
  budget_min INTEGER,
  budget_average INTEGER,
  budget_max INTEGER,
  
  -- Détails complets (JSON)
  full_details JSONB NOT NULL,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour requêtes rapides
CREATE INDEX IF NOT EXISTS idx_estimations_user_id ON estimations(user_id);
CREATE INDEX IF NOT EXISTS idx_estimations_method_type ON estimations(method_type);
CREATE INDEX IF NOT EXISTS idx_estimations_created_at ON estimations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_estimations_user_created ON estimations(user_id, created_at DESC);

-- RLS (Row Level Security)
ALTER TABLE estimations ENABLE ROW LEVEL SECURITY;

-- Policy: Les utilisateurs peuvent voir leurs propres estimations
CREATE POLICY "Users can view own estimations"
  ON estimations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent créer leurs estimations
CREATE POLICY "Users can create own estimations"
  ON estimations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent modifier leurs estimations
CREATE POLICY "Users can update own estimations"
  ON estimations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Les utilisateurs peuvent supprimer leurs estimations
CREATE POLICY "Users can delete own estimations"
  ON estimations
  FOR DELETE
  USING (auth.uid() = user_id);

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_estimations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour mettre à jour updated_at
CREATE TRIGGER update_estimations_updated_at_trigger
  BEFORE UPDATE ON estimations
  FOR EACH ROW
  EXECUTE FUNCTION update_estimations_updated_at();

