import React from 'react';
import { Github, Twitter, Linkedin, Mail, Globe, ArrowUpRight, MessageSquare, X, Send, Sparkles, MapPin, Loader2, ScanBarcode, Handshake, BrainCircuit } from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 20 }) => {
  const icons: Record<string, React.ReactNode> = {
    Github: <Github size={size} className={className} />,
    Twitter: <Twitter size={size} className={className} />,
    Linkedin: <Linkedin size={size} className={className} />,
    Mail: <Mail size={size} className={className} />,
    Globe: <Globe size={size} className={className} />,
    ArrowUpRight: <ArrowUpRight size={size} className={className} />,
    MessageSquare: <MessageSquare size={size} className={className} />,
    X: <X size={size} className={className} />,
    Send: <Send size={size} className={className} />,
    Sparkles: <Sparkles size={size} className={className} />,
    MapPin: <MapPin size={size} className={className} />,
    Loader2: <Loader2 size={size} className={className} />,
    ScanBarcode: <ScanBarcode size={size} className={className} />,
    Handshake: <Handshake size={size} className={className} />,
    BrainCircuit: <BrainCircuit size={size} className={className} />,
  };

  return <>{icons[name] || null}</>;
};