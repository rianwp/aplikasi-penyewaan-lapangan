import { PrismaClient } from '@prisma/client'
import adminData from '../lib/adminData'

const prisma = new PrismaClient()

async function main() {
	console.log('🌱 Starting seeding...')

	// Clear existing data (kecuali user)
	await prisma.booking.deleteMany()
	await prisma.batchBooking.deleteMany()
	await prisma.lapangan.deleteMany()
	await prisma.sesiLapangan.deleteMany()
	await prisma.jenisLapangan.deleteMany()
	await prisma.image.deleteMany()

	console.log('🗑️  Cleared existing data')

	// Seed admin jika belum ada
	const existingAdmin = await prisma.user.findUnique({
		where: { email: adminData.email },
	})

	if (!existingAdmin) {
		await prisma.user.create({
			data: adminData,
		})
		console.log('✅ Created admin user')
	} else {
		console.log('ℹ️  Admin user already exists')
	}

	// Seed Images
	const image1 = await prisma.image.create({
		data: {
			imageUrl: '/futsal-1.jpg',
		},
	})

	const image2 = await prisma.image.create({
		data: {
			imageUrl: '/futsal-2.jpg',
		},
	})

	const image3 = await prisma.image.create({
		data: {
			imageUrl: '/badminton-1.webp',
		},
	})

	const image4 = await prisma.image.create({
		data: {
			imageUrl: '/badminton-2.webp',
		},
	})

	const image5 = await prisma.image.create({
		data: {
			imageUrl: '/basket-1.jpg',
		},
	})

	const image6 = await prisma.image.create({
		data: {
			imageUrl: '/voli-1.jpg',
		},
	})

	console.log('✅ Created 6 images')

	// Seed Jenis Lapangan
	const jenisLapanganFutsal = await prisma.jenisLapangan.create({
		data: {
			jenis_lapangan: 'Futsal',
			deskripsi:
				'Lapangan futsal indoor dengan rumput sintetis berkualitas tinggi, lengkap dengan pencahayaan LED dan ruang ganti.',
			Image: {
				connect: [{ id: image1.id }, { id: image2.id }],
			},
		},
	})

	const jenisLapanganBadminton = await prisma.jenisLapangan.create({
		data: {
			jenis_lapangan: 'Badminton',
			deskripsi:
				'Lapangan badminton indoor standar internasional dengan lantai vinyl dan net resmi.',
			Image: {
				connect: [{ id: image3.id }, { id: image4.id }],
			},
		},
	})

	const jenisLapanganBasket = await prisma.jenisLapangan.create({
		data: {
			jenis_lapangan: 'Basket',
			deskripsi:
				'Lapangan basket outdoor dengan ring standar NBA dan permukaan beton halus.',
			Image: {
				connect: [{ id: image5.id }],
			},
		},
	})

	const jenisLapanganVoli = await prisma.jenisLapangan.create({
		data: {
			jenis_lapangan: 'Voli',
			deskripsi:
				'Lapangan voli outdoor dengan pasir halus dan net standar internasional.',
			Image: {
				connect: [{ id: image6.id }],
			},
		},
	})

	console.log('✅ Created 4 jenis lapangan')

	// Seed Sesi Lapangan
	const sesiPagi1 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '06:00',
			jam_berakhir: '08:00',
		},
	})

	const sesiPagi2 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '08:00',
			jam_berakhir: '10:00',
		},
	})

	const sesiSiang1 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '10:00',
			jam_berakhir: '12:00',
		},
	})

	const sesiSiang2 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '12:00',
			jam_berakhir: '14:00',
		},
	})

	const sesiSore1 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '14:00',
			jam_berakhir: '16:00',
		},
	})

	const sesiSore2 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '16:00',
			jam_berakhir: '18:00',
		},
	})

	const sesiMalam1 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '18:00',
			jam_berakhir: '20:00',
		},
	})

	const sesiMalam2 = await prisma.sesiLapangan.create({
		data: {
			jam_mulai: '20:00',
			jam_berakhir: '22:00',
		},
	})

	console.log('✅ Created 8 sesi lapangan')

	// Seed Lapangan - Futsal
	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganFutsal.id,
			id_sesilap: sesiPagi1.id,
			harga: 150000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganFutsal.id,
			id_sesilap: sesiPagi2.id,
			harga: 150000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganFutsal.id,
			id_sesilap: sesiSiang1.id,
			harga: 180000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganFutsal.id,
			id_sesilap: sesiSore1.id,
			harga: 200000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganFutsal.id,
			id_sesilap: sesiMalam1.id,
			harga: 250000,
		},
	})

	// Seed Lapangan - Badminton
	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBadminton.id,
			id_sesilap: sesiPagi1.id,
			harga: 80000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBadminton.id,
			id_sesilap: sesiSiang2.id,
			harga: 100000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBadminton.id,
			id_sesilap: sesiSore2.id,
			harga: 120000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBadminton.id,
			id_sesilap: sesiMalam2.id,
			harga: 150000,
		},
	})

	// Seed Lapangan - Basket
	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBasket.id,
			id_sesilap: sesiPagi2.id,
			harga: 100000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBasket.id,
			id_sesilap: sesiSiang1.id,
			harga: 120000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganBasket.id,
			id_sesilap: sesiSore1.id,
			harga: 150000,
		},
	})

	// Seed Lapangan - Voli
	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganVoli.id,
			id_sesilap: sesiPagi1.id,
			harga: 90000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganVoli.id,
			id_sesilap: sesiSiang2.id,
			harga: 110000,
		},
	})

	await prisma.lapangan.create({
		data: {
			id_jenislap: jenisLapanganVoli.id,
			id_sesilap: sesiSore2.id,
			harga: 130000,
		},
	})

	console.log('✅ Created 15 lapangan')

	console.log('🎉 Seeding completed successfully!')
	console.log('\n📊 Summary:')
	console.log('   - 6 Images')
	console.log('   - 4 Jenis Lapangan (Futsal, Badminton, Basket, Voli)')
	console.log('   - 8 Sesi Lapangan (06:00 - 22:00)')
	console.log('   - 15 Lapangan dengan berbagai kombinasi')
}

main()
	.catch((e) => {
		console.error('❌ Error during seeding:', e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
