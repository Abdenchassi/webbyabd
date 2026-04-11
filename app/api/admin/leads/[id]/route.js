import { NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';
import { updateLeadStatus, deleteLead } from '../../../../lib/store';

export async function PATCH(request, { params }) {
  const key = request.headers.get('x-admin-key');
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  const { status } = await request.json();
  try {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    updateLeadStatus(Number(id), status);
    return NextResponse.json({ success: true });
  }
}

export async function DELETE(request, { params }) {
  const key = request.headers.get('x-admin-key');
  if (key !== process.env.ADMIN_KEY) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;
  try {
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    deleteLead(Number(id));
    return NextResponse.json({ success: true });
  }
}
