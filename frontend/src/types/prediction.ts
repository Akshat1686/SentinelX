export interface Prediction {
  _id: string;
  city: string;
  predicted_aqi_change: number;
  spike_probability: number;
  risk_level: string;
  construction_intensity_used: number;
  created_at: string;
}
