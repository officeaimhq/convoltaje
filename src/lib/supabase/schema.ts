/**
 * Esquema de Base de Datos (Supabase / PostgreSQL)
 * 
 * Este archivo sirve como la fuente de verdad del diseño relacional de la BD.
 * Todas las entidades en Zustand DEBEN mapearse a estas definiciones.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      // SPRINT 1: FLUJO DE PAGOS
      payments: {
        Row: {
          id: string
          created_at: string
          deal_id: string // Relación con el lead/cliente
          amount: number
          currency: 'USD' | 'CUP' | 'MLC' | 'EUR'
          payment_method: 'transferencia' | 'efectivo' | 'zelle' | 'saldo'
          status: 'pendiente' | 'en_revision' | 'confirmado' | 'rechazado'
          screenshot_url: string | null // Obligatorio si es transferencia
          reviewer_id: string | null // Quién de la dirección lo confirmó
          confirmed_screenshot_url: string | null // Captura del lado de Convoltaje al recibir
          notes: string | null
        }
        Insert: Omit<Database['public']['Tables']['payments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['payments']['Insert']>
      }

      // SPRINT 1: REINTEGROS
      refunds: {
        Row: {
          id: string
          created_at: string
          payment_id: string // Relación al pago original
          deal_id: string
          requested_by: string // Comercial que inició el reintegro
          amount_to_refund: number
          status: 'pendiente' | 'procesado'
          material_status_decision: 'disponible' | 'merma' | 'revision_tecnica'
          material_decided_by: string | null // Quién tomó la decisión del material
        }
        Insert: Omit<Database['public']['Tables']['refunds']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['refunds']['Insert']>
      }

      // SPRINT 1: QUEJAS (Actualización del modelo actual)
      complaints: {
        Row: {
          id: string
          created_at: string
          deal_id: string
          client_name: string
          phone: string
          priority_category: 'incendio' | 'instalacion_incompleta' | 'mal_funcionamiento' | 'atencion_inadecuada'
          system_type: string
          installation_date: string
          warranty_months: number
          symptom: string
          status: 'diagnostico' | 'visita' | 'dictamen' | 'resolucion' | 'resuelta' | 'rechazada'
          assigned_tech_id: string | null
          checklist: Json // JSONB de los pasos del workflow
        }
        Insert: Omit<Database['public']['Tables']['complaints']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['complaints']['Insert']>
      }
    }
  }
}
